class DuasController < ApplicationController

  # GET /duas
  def index
    if params.has_key?("grab_dua")
      @dua = Dua.where("dua_name_arabic ILIKE ?", params[:grab_dua])

      @json_response = {STATUS: 'SUCCESS', dua: @dua}
      render json: Oj.dump(@json_response, mode: :compat)
    elsif params.has_key?("dua_line")
      @line = Dua.where("line_id = ? AND dua_name_arabic ILIKE ?", params[:dua_line].to_i, params[:dua_name])
      @num_lines = Dua.where("dua_name_arabic ILIKE ?", params[:dua_name]).size
      @json_response = {STATUS: 'SUCCESS', line: @line[0], num_lines: @num_lines}
      render json: Oj.dump(@json_response, mode: :compat)
    elsif params.has_key?("dua_list")
      @duas = Dua.all.distinct.pluck(:dua_name_arabic)

      @json_response = {STATUS: 'SUCCESS', dua: @duas}
      render json: Oj.dump(@json_response, mode: :compat)
    end
  end

  # GET /duas/1
  def show
    render json: @dua
  end
end
