class User < ApplicationRecord
  include TokenGenerateService
  
  before_save :downcase_email
  validates :name, presence: true, length: { maximum: 15 }
  VALID_EMAIL_REGEX = /\A[\w+\-.]+@[a-z\d\-.]+\.[a-z]+\z/i
  validates :email, presence: true, length: { maximum: 255 },
                    format: { with: VALID_EMAIL_REGEX },
                    uniqueness: true
  validates :introduction, length: { maximum: 255 }
  validates :password, presence: true, length: { minimum: 6 }, allow_nil: true
  has_secure_password

  def remember(jti)
    update_attribute(:refresh_jti, jti)
  end

  def forget
    update_attribute(:refresh_jti, nil)
  end

  def response_json(payload = {})
    as_json(only: [:id, :name]).merge(payload).with_indifferent_access
  end

  private

  def downcase_email
    self.email = email.downcase
  end
end
