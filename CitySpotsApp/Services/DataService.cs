using CitySpotsApp.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Text.Json;
using System.Threading.Tasks;


namespace CitySpotsApp.Services;

public class DataService
{
    public DatabaseRoot Data { get; set; } = new();
    private string? _filePath;

    public async Task InitializeAsync()
    {
        _filePath = Path.Combine(FileSystem.AppDataDirectory, "spots-db.json");

        if (File.Exists(_filePath))
        {
            var json = await File.ReadAllTextAsync(_filePath);
            Data = JsonSerializer.Deserialize<DatabaseRoot>(json) ?? new DatabaseRoot();
        }
        else
        {
            using var stream = await FileSystem.OpenAppPackageFileAsync("spots-db.json");
            using var reader = new StreamReader(stream);
            var json = await reader.ReadToEndAsync();
            Data = JsonSerializer.Deserialize<DatabaseRoot>(json) ?? new DatabaseRoot();
            await SaveDataAsync();
        }
    }

    public async Task SaveDataAsync()
    {
        var options = new JsonSerializerOptions { WriteIndented = true };
        var json = JsonSerializer.Serialize(Data, options);
        if (_filePath != null)
        {
            await File.WriteAllTextAsync(_filePath, json);
        }
    }
}
