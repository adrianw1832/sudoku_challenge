module AppHelpers
  def current_user
    @current_user ||= User.get(session[:user_id])
  end

  def time_to_minutes(time)
    minutes = time / 60
    seconds = time % 60
    minutes >= 1 ? "#{minutes}m #{seconds}s" : "#{seconds}s"
  end
end
