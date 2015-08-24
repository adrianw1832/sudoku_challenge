module Sudoku
  module Routes
    class Homepage < Base
      get '/' do
        erb :index #Remember to change this shit ---------------------------------------------
      end

      get '/game' do
        erb :game
      end

      get '/results' do
        erb :results
      end
    end
  end
end
