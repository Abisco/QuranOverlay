class QuranVersesController < ApplicationController
  
    # GET /quran_verses
    def index
        if params[:verse_number] && params[:surah_number]
            @quran_verse = QuranVerse.where("verse_id = ? AND surah_id = ?", params[:verse_number].to_i, params[:surah_number].to_i)
            
            @json_response = {STATUS: 'SUCCESS', verse: @quran_verse}
            render json: Oj.dump(@json_response, mode: :compat)
        elsif params[:surah_number]
            @surah_verses = QuranVerse.where("surah_id = ?", params[:surah_number].to_i).order("verse_id ASC")
            
            @json_response = {STATUS: 'SUCCESS', surah: @surah_verses}
            render json: Oj.dump(@json_response, mode: :compat)
        elsif params[:find_verse]
            @verses = QuranVerse.where("(arabic_ayah ILIKE ? OR shakir_ayah ILIKE ?) AND verse_id != 0", "%#{params[:find_verse]}%", "%#{params[:find_verse]}%").select("surah_id, verse_id, arabic_ayah, shakir_ayah").order("surah_id ASC")

            @json_response = {STATUS: 'SUCCESS', verses: @verses}
            render json: Oj.dump(@json_response, mode: :compat)
        elsif params[:verse_range]
        end
    end
  end
  