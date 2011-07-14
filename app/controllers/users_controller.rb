class UsersController < ApplicationController
  def index
    @users = User.all
  end

  def show
    youtube_client = YouTubeIt::Client.new
    @user = User.find(params[:id])
  end
end
