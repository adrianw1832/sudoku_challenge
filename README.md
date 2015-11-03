##Sudoku Challenge

This project is from the week 6 weekly challenge of the Makers Academy course.
Week 6 of the course is also known as lab week, where the students are free to
choose what they want to do for their project, and for that, we chose to do a
Sudoku game on the web. We were initially unsure about how much we could
actually do at the beginning, but managed to implement almost all the features
in the end. That includes a mode with a randomly generated, solvable, but
non-unique Sudoku where players are timed against each other. It also includes
another mode where players can use our backtrack algorithm to solve any given
Sudoku puzzle. Most puzzles can be solved under seconds, and the time taken and
the recursion steps are printed out onto the screen. The hardest one took over
10 minutes with over 60 million recursion steps.

##Challenges

Implementing the game logic for validating the winning conditions were actually
pretty easy. We started with a 3 x 3 as our MVP and moved to a 9 x 9, which only
really required one more validation step. The difficult part started when we
tried to link up the javascript with the html, since we needed a way to map the
exact grid square to the corresponding position in the validation array. We
managed that by using loops and some javascript proxy. The biggest challenge was
implementing the algorithm to generate a solvable Sudoku, since we realised,
without it, we wouldn't have a timed mode because we can't provide solvable
puzzles. We spent most of Thursday trying to crack it but it wasn't until
Thursday night that I saw a pseudo code for a backtrack algorithm that I was
finally able to put all the pieces together to make it work. The logic was fully
tested but it was difficult to test the features mainly because of some unknown
asynchronous issues. The table for the Sudoku is only loaded for one feature
test and not others, and I have not found a fix for it.

##Technologies used

Javascript, jQuery, HTML, CSS, Ruby, Sinatra

RSpec, Capybara, Jasmine, Jasmine jQuery

##How to install

Clone the repo, run bower install, and then run rackup in the terminal. You would also need to set up the
development (and test databases). Visit localhost:9292 and sign up to access the
timed mode or solver mode.

To run the tests, run rspec in the terminal for the ruby and user feature tests,
where Firefox installation is required for two of the feature tests. To run the
javascript tests, run open specrunner.html in the terminal. It might be best to
run them on Safari as there are some security settings conflict on Chrome.
