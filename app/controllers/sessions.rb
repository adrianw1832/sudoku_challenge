module Sudoku
  module Routes
    class Sessions < Base
      get '/sessions/new' do
        if current_user
          flash[:notice] = "#{@current_user.username} is logged in already!"
          redirect('/')
        end
        erb :'sessions/new'
      end

      post '/sessions' do
        user = User.authenticate(params[:username], params[:password])
        if user
          session[:user_id] = user.id
          redirect('/')
        else
          flash.now[:errors] = ['The email or password is incorrect']
          erb :'sessions/new'
        end
      end

      delete '/sessions' do
        user = User.get(session[:user_id])
        flash[:notice] = "Goodbye, #{user.username}!"
        session.clear
        redirect('/')
      end
    end
  end
end
