# VectorCore

VectorCore is a TypeScript library that provides a simple and efficient way to store and query vector data using [vectra](https://www.npmjs.com/package/vectra). It includes a built-in vector generator that uses [fastembed](https://www.npmjs.com/package/fastembed), making it easy to work with vector data for free.

## Features

- Vector database with support for storing and querying vector data
- Built-in vector generator for generating vectors from text data
- Support for different vector types (Query, Passage, Any)

## Installation

To install VectorCore, run the following command:

```bash
npm install vectorcore
```

## Usage

To use VectorCore, import the `DataBase` and `VectorGenerator` classes.

```typescript
import { DataBase, VectorGenerator } from "vectorcore";
//For CommonJS
// const {DataBase,VectorGenerator} = require("vectorcore");
```

Create a new instance of the `DataBase` class, passing in the folder path where you want to store the database.

```typescript
const db = new DataBase("./database");
```

Create a new instance of the `VectorGenerator` class, passing in the embedding model you want to use.

```typescript
import { EmbeddingModel } from "vectorcore"; //This imports an Enum with all the possible embedding models
const vectorGenerator = new VectorGenerator(EmbeddingModel.AllMiniLML6V2);
```

Now we need to initialize the generator and the database

```typescript
await db.initialize(); //Resolves to a promise
await vectorGenerator.initialize(); //Resolves to a promise
```

And now we are free to use the generator and the database to save or retrieve items

> **Note:** The `generateVector` method can be passed a VectorType to increase accuracy in this case we are gonna use Query cause is a single word but for larger texts you could use Passage or if you dont want to specify anything you can use Any.

```typescript
import { VectorTypes } from "vectorcore"; //Import the vectortypes

const vectorApple = await vectorGenerator.generateVector(
	"apple",
	VectorTypes.Query
);
const vectorOranges = await vectorGenerator.generateVector(
	"oranges",
	VectorTypes.Query
);
const vectorRed = await vectorGenerator.generateVector(
	"red",
	VectorTypes.Query
);
const vectorBlue = await vectorGenerator.generateVector(
	"blue",
	VectorTypes.Query
);
await db.addItem(vectorApple, {
	metadata: {
		name: "Apple",
	},
}); //The metadata is an object that contains whatever you want to store like name,descriptions or anything else
await db.addItem(vectorOranges, {
	metadata: {
		name: "Oranges",
	},
});
await db.addItem(vectorRed, {
	metadata: {
		name: "Red",
	},
});
await db.addItem(vectorBlue, {
	metadata: {
		name: "Blue",
	},
});

const searchVector = await vectorGenerator.generateVector("fruit");

const items = await db.getItems(searchVector, 2);
console.log(items.map((e) => e.item)); // We need to map the item because the returned object has {item: Item, score: number}. Score is used to sort the results.

/*
   We search the database with the search vector and get the top 2 results.
   The expected output is an array containing two items with the metadata:
   [
       {
           id: "randomId if not defined at item",
           metadata: { name: "Oranges" },
           vector: number[],
           norm: number
       },
       {
           id: "randomId if not defined at item",
           metadata: { name: "Apple" },
           vector: number[],
           norm: number
       }
   ]
*/
```

### Generating array of vectors

To reduce vector generation calls you can pass an array of strings to the `generateVectors` method

> **Note:** This method has less accuracy for Queries than `generateVector`

> **Warning:** this method will return an asynchronous iterable with promises

```typescript
const Texts = ["apple", "oranges", "red", "blue"];

const vector = await vectorGenerator.generateVectors(Texts);
/*
You can specify the batch size to process some vectors at the same time the vectors are generating
Example: batchSize 1 will execute the for loop at every vector it generates
but batchSize 2 will execute the for loop at every 2 vectors it generates
*/
for await (const Batch of vector) {
	console.log(Batch);
}
```

## Contributing

Contributions are welcome! If you'd like to contribute to VectorCore, please fork the repository and submit a pull request.
