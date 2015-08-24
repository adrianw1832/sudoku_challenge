module Sudoku
  module Routes
    class Signup < Base
      get '/users/new' do
        if current_user
          flash[:notice] = "#{@current_user.username} is logged in already!"
          redirect('/')
        end
        erb :'users/new'
      end

      post '/users' do
        user = User.create(
          username: params[:username], email: params[:email],
          password: params[:password],
          password_confirmation: params[:password_confirmation])
        if user.save
          session[:user_id] = user.id
          redirect('/')
        else
          flash.now[:errors] = user.errors.full_messages
          erb :'users/new'
        end
      end
    end
  end
end
