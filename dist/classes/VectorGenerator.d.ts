import { EmbeddingModel } from "fastembed";
import { VectorTypes } from "../Types";
declare class VectorGenerator {
    private modelEnum;
    private EMBEDDINGMODEL?;
    /**
     * Constructor for VectorGenerator
     * @param embeddingmodel The embedding model to be used
     */
    constructor(embeddingmodel: EmbeddingModel);
    /**
     * Initializes the vector generator with the given embedding model.
     * This method must be called before any other methods can be used.
     * @returns {Promise<void>}
     */
    initialize(): Promise<void>;
    /**
     * Generates an embedding vector for the given text based on the specified vector type.
     *
     * @param {string} text - The text to be embedded.
     * @param {VectorTypes} [type] - The type of vector to generate. Can be Query, Passage, or Any.
     * @returns {Promise<number[] | undefined>} A promise that resolves to the generated vector or undefined if the embedding model is not initialized.
     */
    generateVector(text: string, type?: VectorTypes): Promise<number[] | AsyncGenerator<number[][], void, unknown> | undefined>;
    /**
     * Generates an array of embedding vectors for the given array of text.
     *
     * @param {string[]} text - The array of text to be embedded.
     * @param {number} [batchSize] - The batch size to use for the embedding. Defaults to 1.
     * @returns {Promise<number[][] | undefined>} A promise that resolves to the generated array of vectors or undefined if the embedding model is not initialized.
     */
    generateVectors(text: string[], batchSize?: number): Promise<AsyncGenerator<number[][], void, unknown> | undefined>;
}
export default VectorGenerator;
//# sourceMappingURL=VectorGenerator.d.ts.map