import express, { Request, Response } from 'express';
import supertest from "supertest";
import app from "../index";

// const app = express();

describe('basic test suite', () => {
    it('checks if test module is working properly', () => {
        const testVariable = true;
        expect(testVariable).toBeTruthy();
    })
})

describe('Test GET /view/:imageName', function() {
    // it('responds with status 200 and image file', async() => {
    //     const response = await supertest(app)
    //         .get('/view/fjord')
    //         .send({})
    //         // .expect('Content-Type', /jpeg/)
    //         // .expect(200)
    //         // .end(function(err, res) {
    //         //     if (err) throw err; // return done(err);
    //         //     return done();
    //         // });
    //     expect(response.headers["Content-Type"]).toMatch(/jpeg/);
    //     expect(response.status).toEqual(200);
    // });

    it('responds with status 200 and image file', (done) => {
        supertest(app)
            .get('/view/fjord')
            .send({})
            // .set('Accept', 'image/jpeg')
            .expect('content-type', /jpeg/)
            .expect(200)
            .expect('content-length', '2421874')
            .end(function(err, res) {
                if (err) throw err; // return done(err);
                return done();
            });
    });

    it('responds with status 400 and notfound image file', (done) => {
        supertest(app)
            .get('/view/goldcliff')
            .send({})
            // .set('Accept', 'image/jpeg')
            .expect('content-type', /jpeg/)
            .expect(400)
            .end(function(err, res) {
                if (err) throw err; // return done(err);
                return done();
            });
    });
});

it("GET /posts", async () => {
	// const post = await Post.create({
	// 	title: "Post 1",
	// 	content: "Lorem ipsum",
	// })

	// await supertest(app)
	// 	.get("/api/posts")
	// 	.expect(200)
	// 	.then((response) => {
	// 		// Check the response type and length
	// 		expect(Array.isArray(response.body)).toBeTruthy()
	// 		expect(response.body.length).toEqual(1)

	// 		// Check the response data
	// 		expect(response.body[0]._id).toBe(post.id)
	// 		expect(response.body[0].title).toBe(post.title)
	// 		expect(response.body[0].content).toBe(post.content)
	// 	})
})