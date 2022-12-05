require 'rails_helper'

RSpec.describe "API::V1::Users", type: :request do
  let(:request_header) { { "Content-Type" => "application/json" } }

  it 'loads a user' do
    user = FactoryBot.create(:user)

    get api_v1_user_path(user)
    expect(response).to have_http_status(:ok)

    json = JSON.parse(response.body)
    expect(json['name']).to eq user.name
    expect(json['email']).to eq user.email
    expect(json['introduction']).to eq user.introduction

    assert_schema_conform
  end

  it 'creates a user' do
    expect {
      post api_v1_signup_path, params: {
        user: {
          name: "name",
          email: "name@example.com",
          password: "foobar",
          password_confirmation: "foobar"
        }
      }.to_json,
      headers: request_header
    }.to change(User, :count).by(1)

    expect(response).to have_http_status(:created)

    # assert_schema_conformで実行すると"response definition does not exist"エラーが発生。恐らくレスポンスがあることを想定している。OAS的にはレスポンスがないのが正解なのでリクエストだけテストする
    assert_request_schema_confirm
  end

  it "doesn't create a user" do
    expect {
      post api_v1_signup_path, params: {
        user: {
          name: 'a' * 16,
          email: "#{'a' * 244}@example.com",
          password: 'foo',
          password_confirmation: 'a' * 128
        }
      }
    }.to_not change(User, :count)

    expect(response).to have_http_status(:bad_request)
  end
end
