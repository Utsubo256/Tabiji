require 'rails_helper'

RSpec.describe "API::V1::Users", type: :request do
  it 'loads a user' do
    user = FactoryBot.create(:user)

    get api_v1_user_path(user)
    expect(response).to have_http_status(:ok)

    json = JSON.parse(response.body)
    expect(json['name']).to eq user.name
    expect(json['email']).to eq user.email
    expect(json['introduction']).to eq user.introduction
  end
end
