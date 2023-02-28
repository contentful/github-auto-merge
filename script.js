const opts = github.rest.pulls.listReviews.endpoint.merge({
    pull_number: context.payload.pull_request.number,
    owner: context.payload.repository.owner.login,
    repo: context.payload.repository.name,
  });
  const reviews = await github.paginate(opts);
  const ourReview = reviews.find(
    (review) =>
      review.state === "APPROVED" && review.user.login === "contentful-automation[bot]"
  );
  if (ourReview) {
    console.log(
      `The user "${ourReview.user.login}" has already approved and requested this PR is merged, exiting`
    );
    return;
  }
  github.rest.pulls.createReview({
    owner: context.payload.repository.owner.login,
    repo: context.payload.repository.name,
    pull_number: context.payload.pull_request.number,
    event: 'APPROVE',
    body: ''
  })

  github.rest.pulls.