module Sudoku
  module Routes
    class Homepage < Base
      get '/' do
        erb :homepage
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
