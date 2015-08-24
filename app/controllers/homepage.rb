module Sudoku
  module Routes
    class Homepage < Base
      get '/' do
        erb :index #Remember to change this shit ---------------------------------------------
      end
    end
  end
end