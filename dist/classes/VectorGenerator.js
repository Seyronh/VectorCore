"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const fastembed_1 = require("fastembed");
const Types_1 = require("../Types");
class VectorGenerator {
    /**
     * Constructor for VectorGenerator
     * @param embeddingmodel The embedding model to be used
     */
    constructor(embeddingmodel) {
        this.modelEnum = embeddingmodel;
    }
    /**
     * Initializes the vector generator with the given embedding model.
     * This method must be called before any other methods can be used.
     * @returns {Promise<void>}
     */
    initialize() {
        return __awaiter(this, void 0, void 0, function* () {
            this.EMBEDDINGMODEL = yield fastembed_1.FlagEmbedding.init({
                model: this.modelEnum,
            });
        });
    }
    /**
     * Generates an embedding vector for the given text based on the specified vector type.
     *
     * @param {string | string[]} text - The text to be embedded.
     * @param {VectorTypes} [type] - The type of vector to generate. Can be Query, Passage, or Any.
     * @returns {Promise<number[] | undefined>} A promise that resolves to the generated vector or undefined if the embedding model is not initialized.
     */
    generateVector(text, type) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a, _b, _c, _d, _e, _f, _g;
            switch (type) {
                case Types_1.VectorTypes.Query:
                    return (_a = this.EMBEDDINGMODEL) === null || _a === void 0 ? void 0 : _a.queryEmbed(text);
                case Types_1.VectorTypes.Passage:
                    return (_d = (_c = (yield ((_b = this.EMBEDDINGMODEL) === null || _b === void 0 ? void 0 : _b.passageEmbed([text], 1).next()))) === null || _c === void 0 ? void 0 : _c.value) === null || _d === void 0 ? void 0 : _d[0];
                default:
                    return (_g = (_f = (yield ((_e = this.EMBEDDINGMODEL) === null || _e === void 0 ? void 0 : _e.embed([text], 1).next()))) === null || _f === void 0 ? void 0 : _f.value) === null || _g === void 0 ? void 0 : _g[0];
            }
        });
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
    generateVectors(texts, batchSize, type) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a, _b;
            switch (type) {
                case Types_1.VectorTypes.Passage:
                    return (_a = this.EMBEDDINGMODEL) === null || _a === void 0 ? void 0 : _a.passageEmbed(texts, batchSize);
                default:
                    return (_b = this.EMBEDDINGMODEL) === null || _b === void 0 ? void 0 : _b.embed(texts, batchSize);
            }
        });
    }
}
exports.default = VectorGenerator;
//# sourceMappingURL=VectorGenerator.js.map