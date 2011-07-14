# Load the rails application
require File.expand_path('../application', __FILE__)

# Initialize the rails application
BeerFridayDJ::Application.initialize!

Rails.application.config.session_store(:active_record_store,
                                       :key => '_beer_friday_dj')
