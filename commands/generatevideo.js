const result = await videoRouter.generateVideo(prompt);

if (!result.success) {

    return await bot.sendMessage(
        chatId,
        `⚠️ ${result.message}

Video engine install hone ke baad ye command automatically kaam karegi.`
    );

}

await bot.sendMessage(
    chatId,
`✅ Video Generated

Provider: ${result.provider}

Model: ${result.model}

Video:
${result.video}`
);
