module Sudoku
  module Routes
    class Game < Base
      get '/game' do
        erb :game
      end

      get '/results' do
        user = User.get(session[:user_id])
        @results = time_to_minutes(user.records.last.time)
        erb :results
      end

      post '/results' do
        record = Record.create(time: params[:seconds], user: current_user)
        record.save
      end
    end
  end
end
