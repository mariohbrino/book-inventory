import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";

const specPath = new URL("./openapi.json", import.meta.url);
const spec = JSON.parse(await readFile(specPath, "utf8"));

assert.equal(spec.openapi, "3.1.0", "OpenAPI version must be 3.1.0");
assert.ok(spec.info?.title, "OpenAPI info.title is required");
assert.ok(spec.info?.version, "OpenAPI info.version is required");
assert.ok(
  spec.paths && typeof spec.paths === "object",
  "OpenAPI paths are required",
);

const expectedOperations = {
  "/": ["get"],
  "/users": ["get", "post"],
  "/users/{id}": ["get", "put", "delete"],
  "/books": ["get", "post"],
  "/books/{id}": ["get", "put", "delete"],
  "/loans": ["get", "post"],
  "/loans/{id}": ["get", "put", "delete"],
};

for (const [path, methods] of Object.entries(expectedOperations)) {
  assert.ok(spec.paths[path], `Missing OpenAPI path: ${path}`);
  for (const method of methods) {
    const operation = spec.paths[path][method];
    assert.ok(
      operation,
      `Missing OpenAPI operation: ${method.toUpperCase()} ${path}`,
    );
    assert.ok(
      operation.responses && Object.keys(operation.responses).length > 0,
      `Missing responses for ${method.toUpperCase()} ${path}`,
    );
  }
}

const resolveLocalReference = (reference) => {
  assert.ok(
    reference.startsWith("#/"),
    `External reference is not allowed: ${reference}`,
  );
  return reference
    .slice(2)
    .split("/")
    .reduce(
      (value, key) => value?.[key.replaceAll("~1", "/").replaceAll("~0", "~")],
      spec,
    );
};

const checkReferences = (value) => {
  if (Array.isArray(value)) {
    value.forEach(checkReferences);
    return;
  }
  if (value && typeof value === "object") {
    if ("$ref" in value) {
      assert.ok(
        resolveLocalReference(value.$ref),
        `Unresolved OpenAPI reference: ${value.$ref}`,
      );
    }
    Object.values(value).forEach(checkReferences);
  }
};

checkReferences(spec);
console.log("OpenAPI document is valid and all local references resolve.");
