export class SystemSetting {
    public static ID_SYSTEM_SETTING = "SYSTEM_SETTING";

    public language:string;

    public static getDefaultSystemSettings(): SystemSetting {
        var setting = new SystemSetting();
        setting.language = 'de';
        return setting;
    }
}