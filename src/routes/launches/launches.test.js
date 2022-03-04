const request = require("supertest");
const app = require("../../app");
const { mongoConnect, mongoDisconnect } = require("../../services/mongo");

describe("Launches API", () => {
  beforeAll(async () => {
    await mongoConnect();
  });

  afterAll(async () => {
    await mongoDisconnect();
  })

  describe("Test get /launches", () => {
    test("It should respond with 200 success", async () => {
      const response = await request(app)
        .get("/launches")
        .expect("Content-Type", /json/)
        .expect(200);

      // .expect(200) <====> expect(response.statusCode).toBe(200);
    });
  });

  describe("Test POST /launch", () => {
    const launchTestData = {
      mission: "USS !",
      rocket: "Super Rocket",
      target: "Kepler-1652 b",
      launchDate: "January 4, 2030",
    };

    const launchTestDataNoDate = {
      mission: "USS !",
      rocket: "Super Rocket",
      target: "Kepler-1652 b",
    };

    const launchTestMissingMission = {
      rocket: "Super Rocket",
      target: "Kepler-1652 b",
    };

    test("It should respond with 201 success", async () => {
      const response = await request(app)
        .post("/launches")
        .send(launchTestData)
        .expect("Content-type", /json/)
        .expect(201);

      const requestDate = new Date(launchTestData.launchDate.valueOf());
      const responseDate = new Date(response.body.launchDate.valueOf());

      expect(responseDate).toStrictEqual(requestDate);

      expect(response.body).toMatchObject(launchTestDataNoDate);
    });

    test("It should catch invalid dates", async () => {
      const response = await request(app)
        .post("/launches")
        .send(launchTestDataNoDate)
        .expect("Content-type", /json/)
        .expect(400);

      expect(response.body).toStrictEqual({
        error: "Invalid date",
      });
    });
    test("It should catch missing properties", async () => {
      const response = await request(app)
        .post("/launches")
        .send(launchTestMissingMission)
        .expect("Content-type", /json/)
        .expect(400);

      expect(response.body).toStrictEqual({
        error: "Invalid mission name",
      });
    });
  });
});
