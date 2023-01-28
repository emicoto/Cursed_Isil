@echo off

:: Set working directory
pushd %~dp0
@set TWEEGO_PATH="%~dp0.twine\StoryFormats"

:: Run the appropriate compiler for the user's CPU architecture.
if %PROCESSOR_ARCHITECTURE% == AMD64 (
	CALL "%~dp0_workspace\.twine\tweego_win64.exe" -o "%~dp0public\index.html" --head "%~dp0_workspace\head.html" "%~dp0_workspace\gamecode"  --module "%~dp0_workspace\modules"
) else (
	CALL "%~dp0_workspace\.twine\tweego_win86.exe" -o "%~dp0public\index.html" --head "%~dp0_workspace\head.html" "%~dp0_workspace\gamecode"  --module "%~dp0_workspace\modules"
)

:: Open the HTML file in the default browser
start CursedIsil.exe
