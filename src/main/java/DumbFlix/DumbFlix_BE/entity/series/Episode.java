package DumbFlix.DumbFlix_BE.entity.series;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@Entity
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "episode")
public class Episode {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    public Long id;

    public String episodeName;
    public int episodeNumber;
    public String episodeDescription;
    public String episodeImage;
    public String episodeVideo;
    
    @Column(unique = true)
    private String episodeSlug;

    @ManyToOne
    @JoinColumn(name = "season_id", nullable = false)
    private Season season;
}
