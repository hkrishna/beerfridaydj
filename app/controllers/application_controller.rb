class ApplicationController < ActionController::Base
  protect_from_forgery

  before_filter :find_user

  def find_user
    @logged_in_user = User.find(session[:user_id]) if session[:user_id]
  end
end
