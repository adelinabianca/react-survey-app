- # Doing features
- Create a feature-branch for the release.
- Code the nessesary changes and commit them to your local feature-branch and push them to the remote feature-branch.
- When ready create a Pull Request on the feature-branch.
- When tested and code reviewed, merge the Pull Request, and do not close the branch.
- When everything is done, the feature-branch can be closed.

- # Doing bugfixes
- Create a bugfix-branch for release.
- Code the nessesary changes and commit them to your local bugfix-branch and push them to the remote bugfix-branch.
- Create a Pull Request on the bugfix-branch.
- When tested and code reviewed, merge the Pull Request, and do not close the branch.
  - if the bugfix is also required in another release;
  - Cherry-pick the individual commits from the bugfix-branch into the other bugfix-branch.
  - When ready, create a Pull Request on the bugfix-branch.
  - When tested and code reviewed, merge the Pull Request, and close the branch.
- When everything is done, the bugfix-branch can be closed.

# Contributing to the react-survey-app
React-survey-app welcomes contributions to our open source projects on Github.

# Issues
Feel free to submit issues and enhancement requests.
