require 'test_helper'

class DuasControllerTest < ActionDispatch::IntegrationTest
  setup do
    @dua = duas(:one)
  end

  test "should get index" do
    get duas_url, as: :json
    assert_response :success
  end

  test "should create dua" do
    assert_difference('Dua.count') do
      post duas_url, params: { dua: {  } }, as: :json
    end

    assert_response 201
  end

  test "should show dua" do
    get dua_url(@dua), as: :json
    assert_response :success
  end

  test "should update dua" do
    patch dua_url(@dua), params: { dua: {  } }, as: :json
    assert_response 200
  end

  test "should destroy dua" do
    assert_difference('Dua.count', -1) do
      delete dua_url(@dua), as: :json
    end

    assert_response 204
  end
end
