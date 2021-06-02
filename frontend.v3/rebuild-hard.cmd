ECHO OFF
call npm remove .\ui-kit-0.0.1.tgz
call rmdir /Q/S .\dist
call rmdir /Q/S .\node_modules
call del /f .\ui-kit-0.0.1.tgz
call npm run build -- ui-kit
call npm pack .\dist\ui-kit
call npm install .\ui-kit-0.0.1.tgz
call npm install
call npm run build:dev