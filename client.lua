local Promise = nil
xSound = exports["xsound"]

RegisterNUICallback('close', function()
    SetNuiFocus(false, false)
    if Promise then
        Promise:resolve(false)
    end
end)

RegisterNUICallback('completed', function()
    SetNuiFocus(false, false)
    Promise:resolve(true)
end)

RegisterNUICallback('failed', function()
    SetNuiFocus(false, false)
    Promise:resolve(false)
end)

RegisterNUICallback('startalarm', function()
    
end)

exports('startRobbery', function(damage, pins)

    SendNUIMessage({
        start = true,
    })
    SetNuiFocus(true, true)
    
    Promise = promise.new()

    Citizen.CreateThread(function() 
        while Promise.state ~= 3 and not LocalPlayer.state.dead do
            Citizen.Wait(500)
        end
        Citizen.Wait(100)
        if LocalPlayer.state.dead then
            Promise:resolve(false)
            SendNUIMessage({
                stop = true,
            })
            SetNuiFocus(false, false)
        end
    end)

    local result = Citizen.Await(Promise)

    if result then
        xSound:PlayUrl("robbery_success", "https://cdn.discordapp.com/attachments/1076531250707300413/1153775215214596227/unlock.mp3", 0.1)
    else
        xSound:PlayUrl("robbery_fail", "https://cdn.discordapp.com/attachments/1076531250707300413/1153776587993518190/break.mp3", 0.1)
    end

    return result
end)