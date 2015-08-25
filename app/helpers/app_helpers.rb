module AppHelpers
  def current_user
    @current_user ||= User.get(session[:user_id])
  end

  def time_to_minutes(time)
    minutes = time.to_i % 60
    seconds = time.to_i / 60
    return "#{minutes} minutes #{seconds} seconds"
  end
end
