class VideosController < ApplicationController

  def create
    if @logged_in_user
      Video.create_from_url(params[:url], @logged_in_user)
      redirect_to(:controller => :users, :action => :show, :id => @logged_in_user)
    else
      redirect_to(:controller => :users)
    end
  end

  def destroy
    video = Video.find(params[:id])

    if @logged_in_user
      video.destroy if video.user == @logged_in_user
      redirect_to(:controller => :users, :action => :show, :id => @logged_in_user)
    else
      redirect_to(:controller => :users)
    end    
  end

end
