var assert = require('assert');

module.exports = {
  run: function (step, dexter) {
    //access token
    var accessToken = dexter.environment('access_token');
    var giphy = require('giphy-api')(accessToken);

    //inputs
    var tag = step.input('tag').first();
    var rating = step.input('rating').first();
    var fmt = step.input('fmt').first();

    //post options
    var postOptions = {
      tag: tag,
      rating: rating,
      fmt: fmt
    };

    //execution
    giphy.random(postOptions, function (err, res) {
      var finalResponse = {
        data: {}
      };

      if (fmt === 'html') {
        finalResponse.data.html = res;
      } else {
        finalResponse = res;
      }

      if (err) return this.fail(err);
      this.complete(finalResponse);
    }.bind(this));
  }
};
