package DumbFlix.DumbFlix_BE.entity.series;

import java.util.ArrayList;
import java.util.List;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@Entity
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "Seasons")
public class Season {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long seasonId;

    private int seasonNumber;

    @ManyToOne
    @JoinColumn(name = "series_id", nullable = false)
    private Series series;

    @OneToMany(mappedBy = "season", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Episode> episodes = new ArrayList<>();
}
