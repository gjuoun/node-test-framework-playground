const chai = require("chai");
const expect = chai.expect;
// import sinon
const sinon = require("sinon");
const indexPage = require("../controllers/app.controller.js");

describe("getIndexPage", function () {
  it("should return index page", function () {
    let req = {}
    // Have `res` have a send key with a function value coz we use `res.send()` in our func
    let res = {
      send: sinon.spy()
    }

    indexPage.getIndexPage(req, res);

    expect(res.send.calledOnce).to.be.true;
    expect(res.send.firstCall.args[0]).to.equal('Hey')
  });
});


const user = {
  addUser: (name) => {
    this.name = name;
  }
}

describe("User", function () {
  describe("addUser", function () {
    it("should add a user", function () {
      sinon.spy(user, "addUser");
      user.addUser("John Doe")

      expect(user.addUser.calledOnce).to.be.true;
      expect(user.addUser.firstCall.args[0]).to.equal("John Doe");
    });
  });
});