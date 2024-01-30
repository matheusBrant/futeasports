using System;

public class Player
{
    public int Rank { get; set; }
    public int OverallRating { get; set; }
    public string FirstName { get; set; }
    public string LastName { get; set; }
    public string CommonName { get; set; }
    public DateTime Birthdate { get; set; }
    public int Height { get; set; }
    public int SkillMoves { get; set; }
    public int WeakFootAbility { get; set; }
    public int AttackingWorkRate { get; set; }
    public int DefensiveWorkRate { get; set; }
    public int PreferredFoot { get; set; }
    public string LeagueName { get; set; }
    public int Weight { get; set; }
    public string AvatarUrl { get; set; }
    public string ShieldUrl { get; set; }
    public Dictionary<string, object> Relationships { get; set; }
    public Dictionary<string, object> Attributes { get; set; }
}
