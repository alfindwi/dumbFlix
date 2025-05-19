package DumbFlix.DumbFlix_BE.entity.series;

import java.util.ArrayList;
import java.util.List;

import DumbFlix.DumbFlix_BE.entity.categories.Categories;
import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.JoinTable;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.OneToMany;
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
@Table(name = "series")
public class Series {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    public Long id;

    public String seriesName;
    public String seriesYear;
    private String posters;
    private String description;
    private String trailer;

    @ManyToMany
    @JoinTable(name = "category_series", 
    joinColumns = @JoinColumn(name = "series_id"), inverseJoinColumns = @JoinColumn(name = "category_id"))
    private List<Categories> categories;

    @OneToMany(mappedBy = "series", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Season> seasons = new ArrayList<>();
}
