class SessionsController < ApplicationController

  def new
  end

  def create
    user = User.find_or_create_by_email(params[:email])
    session[:user_id] = user.id
    redirect_to(:controller => :users, :action => :show, :id => user)
  end

  def destroy
    session[:user_id] = nil
    redirect_to(:controller => :users, :action => :index)
  end

end
