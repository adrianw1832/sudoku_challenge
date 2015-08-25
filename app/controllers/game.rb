module Sudoku
  module Routes
    class Game < Base
      get '/game' do
        erb :game
      end

      get '/results' do
        @results = time_to_minutes(current_user.time.last)
        erb :results
      end

      post '/results' do
        result = Record.create(time: params[:seconds])
        current_user << result
        current_user.save
        redirect '/results'
      end
    end
  end
end
