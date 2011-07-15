class Video < ActiveRecord::Base
  belongs_to :user

  class << self
    def create_from_url(url, user)
      youtube_client = YouTubeIt::Client.new
      youtube_id = extract_youtube_id(url)
      video = youtube_client.video_by(youtube_id)

      return false if video.noembed

      thumbnail = video.thumbnails.detect {|thumbnail| thumbnail.height < 100}.try(:url)

      user.videos.create(:youtube_id => youtube_id, :title => video.title, :thumbnail => thumbnail)
    end

    def extract_youtube_id(url)
      uri = URI.parse(url)
      if uri.host == 'youtu.be'
        uri.path.split('/')[1]
      else
        Rack::Utils.parse_query(uri.query)['v']
      end
    end
  end
end
