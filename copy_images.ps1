$brain = "C:\Users\kozub\.gemini\antigravity\brain\989015f2-9a49-42ab-bf8c-dae7ca9ab243"
$public = "C:\Users\kozub\Desktop\Projekty\Nowy test\Luty 2026\public"

Copy-Item "$brain\apt_1_living_1774792406104_1774792426589.png" "$public\apt1.png" -Force
Copy-Item "$brain\apt_2_bedroom_1774812406104_1774792462961.png" "$public\apt2.png" -Force
Copy-Item "$brain\apt_3_bathroom_1774847406104_1774792530940.png" "$public\apt3.png" -Force
Copy-Item "$brain\apt_4_kitchen_1774822406114_1774792488613.png" "$public\apt4.png" -Force
Copy-Item "$brain\apt_5_detail_1774842406124_1774792513179.png" "$public\apt5.png" -Force
Copy-Item "$brain\venetian_blinds_shadow_1774792104104_1774792107373.png" "$public\shadow-blinds.png" -Force

Write-Host "Done copying images."
