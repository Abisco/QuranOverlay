require 'nokogiri'
require 'open-uri'

task :add_dua do
    #Run this task to add a dua
    #Command to run: rake add_dua dua_name='Dua Nudba' url='blah' 
    
    
    doc = Nokogiri::HTML(open(ENV['url']))
    table = doc.css('table#table1')

    table[0].css('tr').each_with_index do |row, index|
        text = row.css('td')[0].text.remove("\n", "\t")
        text = text.gsub("ا", "َٴا")
        @dua = Dua.new(
            :dua_name_arabic => ENV['dua_name'],
            :line_id => index,
            :arabic => text,
            :english_translation => row.css('td')[2].text.remove("\n", "\t")
        )
        @dua.save
    end
end