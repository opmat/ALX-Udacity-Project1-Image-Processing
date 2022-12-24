"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const index_1 = __importDefault(require("../index"));
describe('basic test suite', () => {
    it('checks if test module is working properly', () => {
        const testVariable = true;
        expect(testVariable).toBeTruthy();
    });
});
describe('Test GET /view/:imageName', function () {
    it('responds with status 200 and image file', (done) => {
        (0, supertest_1.default)(index_1.default)
            .get('/view/fjord')
            .send({})
            .expect('content-type', /jpeg/)
            .expect(200)
            .expect('content-length', '2421874')
            .end(function (err, res) {
            if (err)
                throw err;
            return done();
        });
    });
    it('responds with status 400 and notfound image file', (done) => {
        (0, supertest_1.default)(index_1.default)
            .get('/view/goldcliff')
            .send({})
            .expect('content-type', /jpeg/)
            .expect(400)
            .end(function (err, res) {
            if (err)
                throw err;
            return done();
        });
    });
});
