from pyrogram import Client
from requests import get
from json import loads

SERVER_LOCATION = 'localhost:3002' # translation server's address

with Client("my_account") as app:
    @app.on_message()
    def _(client, message):
        if message.outgoing:
            message.edit(message.text+"\n➖➖➖➖\n**i18n-gram - (🇩🇪 DE)**:\n{}".format(
                loads(
                    get('http://{serverAddress}/translate?text={text}&from=en&to=de'.format_map(
                        {
                            'text': message.text.replace(' ', '+'),
                            'serverAddress': SERVER_LOCATION
                        }
                    )
                    ).content.decode("utf-8")
                )['result']
            )
        )

    app.idle()
