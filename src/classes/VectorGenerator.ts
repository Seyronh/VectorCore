import { EmbeddingModel, FlagEmbedding } from "fastembed";
import { VectorTypes } from "../Types";
import { isTypedArray } from "util/types";

class VectorGenerator {
	private modelEnum: EmbeddingModel;
	private EMBEDDINGMODEL?: FlagEmbedding;
	/**
	 * Constructor for VectorGenerator
	 * @param embeddingmodel The embedding model to be used
	 */
	constructor(embeddingmodel: EmbeddingModel) {
		this.modelEnum = embeddingmodel;
	}
	/**
	 * Initializes the vector generator with the given embedding model.
	 * This method must be called before any other methods can be used.
	 * @returns {Promise<void>}
	 */
	async initialize() {
		this.EMBEDDINGMODEL = await FlagEmbedding.init({
			model: this.modelEnum,
		});
	}
	/**
	 * Generates an embedding vector for the given text based on the specified vector type.
	 *
	 * @param {string | string[]} text - The text to be embedded.
	 * @param {VectorTypes} [type] - The type of vector to generate. Can be Query, Passage, or Any.
	 * @returns {Promise<number[] | undefined>} A promise that resolves to the generated vector or undefined if the embedding model is not initialized.
	 */
	async generateVector(text: string, type?: VectorTypes) {
		switch (type) {
			case VectorTypes.Query:
				return this.EMBEDDINGMODEL?.queryEmbed(text);
			case VectorTypes.Passage:
				return (await this.EMBEDDINGMODEL?.passageEmbed([text], 1).next())
					?.value?.[0];
			default:
				return (await this.EMBEDDINGMODEL?.embed([text], 1).next())?.value?.[0];
		}
	}
	/**
	 * Generates an array of embedding vectors for the given array of text.
	 * WARNING: This method have less accuracy than `generateVector` in querys
	 *
	 * @param {string[]} texts - The array of text to be embedded.
	 * @param {number} [batchSize] - The batch size to use for the embedding. Defaults to texts length.
	 * @param {VectorTypes} [type] - The type of vector to generate. Can be Query, Passage, or Any.
	 * @returns {Promise<number[][] | undefined>} A promise that resolves to the generated array of vectors or undefined if the embedding model is not initialized.
	 */
	async generateVectors(
		texts: string[],
		batchSize?: number,
		type?: VectorTypes
	) {
		switch (type) {
			case VectorTypes.Passage:
				return this.EMBEDDINGMODEL?.passageEmbed(texts, batchSize);
			default:
				return this.EMBEDDINGMODEL?.embed(texts, batchSize);
		}
	}
}
export default VectorGenerator;
