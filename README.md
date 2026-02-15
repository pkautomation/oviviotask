# Senior Quality Engineer – Automation & Performance Assessment

## General
Hello! Here you will find comments and reasoning on how I approached the exercise.

I found 4 hours time constraint ambitious and finally I have spent around 8 hours in total. I hope you understand that the solution is not gonna be perfectly clean and improvements would have simply taken even more time.

I have created corresponding readme files within task1 and task2 directories. They explain how to execute the tests. I was working on Windows platform and I cannot tell how the solution is about to behave on other OS'es, but some cross-platform compatibility is definitely built-in.

## Task 1 - Playwright tests

### Part 1: Tests implementation

I have implemented very basic example tests for login/invalid login and add product to the cart scenario. I skipped the last case due to time constraints.

I used Page Object Pattern for better reusability of the selectors and to improve the general readability of the tests. Tests are using fixtures for the setup: either we have user that is already logged in or not. Tests should be runnable in parallel based on `workers` parameter in playwright config file.
I am not proud of hardcoded user name and password even though both are displayed on the UI (:D). To get rid of hardcoded values I would use .env file and pipeline variables in Github Actions and pass secrets securely.
Example with made-up failure can be found in file: `example-failure-playwright-report.zip` . Trace file should be included

###  Part 2: Pipeline
For the pipeline I created (working) github workflow that is a bit over-engineered for this task: It uses sharding that allows to divide tests into multiple agents and then consolidate the report.

## Task 2: Performance tests
I decided to play with k6 tool. It has been few years since I used it last time. I have picked up some docker images and used LLM to make them work.
Instead of formal performance report that I generate with AI I simply took a screenshot from grafana that presents the results. Please see `task2/task2-version1-screenshot.jpg` and `task2/task2-version1-description.txt` where I provided the short summary of the run.

I have prepared two scripts: `task2-version1.js` and `task2-version2.js1`. The first script simulates 100 users, while the second simulates 100 requests per second. I leave the second version just to show the difference.

## Reflection & Seniority Check

#### How would you integrate Playwright tests into CI/CD ?
I see couple of options depending on use-case, but typically I would like tests to run whenever they are needed. For instance when pull request is being made or change to pull request is being pushed. Also after merging the code to main branch. Pipeline design should be discussed at least on technical leadership level, because this is critical work.
#### How would you notify the team (Slack/Teams) about failures or regressions?
You can send notifications automatically for instance whenever tests fails. For performance degradation (or improvement!!!) I think this also can be done, but I never tried it. Performance issues might bring too much noise and perhaps it is better to evaluate the results regularly
#### What observability metrics would you include in an end-to-end quality dashboard?
I am not sure what end-to-end quality dashboard is. But I would track  Pass/fails in recent runs, tests amount, amount of bug tickets, amount of bugs coming from production, CVE's tickets (vulnerabilities),  
#### How would you decide: What to automate What not to automate What belongs to performance vs functional testing
For the start I would like to have a good collaboration across multiple roles. This means: DEV+QA+PO working together. If this is in place I would then gather end-to-end scenarios that would be done most frequently. This would be an input to talk to developers on what could be covered on unit/integration tests level. Essentially I would like to create happy-path tests on e2e level and cover validation/error handling scenarios somewhere else if possible. Simply I would like to avoid ice-cone anti-pattern. \ 

To answer what I would not automate: I am constantly asking myself a question while thinking about the test automation: if this test fail, would anyone care about it? If answer is "no", then I would skip that test, because I would not report a bug if such test fails. Bugs for me are not just any flaws that could be found in a system, but rather: flaws that matter to someone. `If nobody would care about the issue it is not a bug.` For instance: If there is one pixel mismatch between the implementation and mockup and nobody cares until it "looks weird", then it is not a bug. It is not hard to generate noise with meaningless stuff...

#### What belongs to performance
Short answer: functional is "what", performance is "how well under certain condition". 

Each endpoint can be performance tested, but that is not sufficient. We also have to test the full user journeys being done, so the scenarios for performance tests should be created with close collaboration of business and development team. I emphasize on that: this is collaborative effort that has to be done continuously.
