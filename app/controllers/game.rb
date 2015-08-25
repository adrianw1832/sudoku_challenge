module Sudoku
  module Routes
    class Game < Base
      get '/game' do
        erb :game
      end

      get '/results' do
        p current_user.records.last
        @results = time_to_minutes(current_user.records.last.time)
        erb :results
      end

      post '/results' do
        p params[:seconds]
        record = Record.create(time: params[:seconds], user: current_user)
        record.save
        redirect '/results'
      end
    end
  end
end
