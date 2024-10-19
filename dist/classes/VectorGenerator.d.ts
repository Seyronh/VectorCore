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
     * @param {string | string[]} text - The text to be embedded.
     * @param {VectorTypes} [type] - The type of vector to generate. Can be Query, Passage, or Any.
     * @returns {Promise<number[] | undefined>} A promise that resolves to the generated vector or undefined if the embedding model is not initialized.
     */
    generateVector(text: string, type?: VectorTypes): Promise<number[] | undefined>;
    /**
     * Generates an array of embedding vectors for the given array of text.
     * WARNING: This method have less accuracy than `generateVector` in querys
     *
     * @param {string[]} texts - The array of text to be embedded.
     * @param {number} [batchSize] - The batch size to use for the embedding. Defaults to texts length.
     * @param {VectorTypes} [type] - The type of vector to generate. Can be Query, Passage, or Any.
     * @returns {Promise<number[][] | undefined>} A promise that resolves to the generated array of vectors or undefined if the embedding model is not initialized.
     */
    generateVectors(texts: string[], batchSize?: number, type?: VectorTypes): Promise<AsyncGenerator<number[][], void, unknown> | undefined>;
}
export default VectorGenerator;
//# sourceMappingURL=VectorGenerator.d.ts.map