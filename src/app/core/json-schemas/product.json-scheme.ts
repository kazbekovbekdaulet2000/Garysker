import { JSONSchema } from "@ngx-pwa/local-storage";

const ProductJSON: JSONSchema = {
  "type": "object",
  "properties": {
    "product": {
      "type": "integer"
    },
    "size": {
      "type": "integer"
    },
    "count": {
      "type": "integer"
    }
  },
  "required": [
    "product",
    "size",
    "count"
  ]
}