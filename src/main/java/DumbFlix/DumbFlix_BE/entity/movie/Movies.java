package DumbFlix.DumbFlix_BE.entity.movie;

import java.util.List;

import DumbFlix.DumbFlix_BE.entity.categories.Categories;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.JoinTable;
import jakarta.persistence.ManyToMany;
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
@Table(name = "movies")
public class Movies {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long movieId;

    private String title;

    private String year;

    @Column(unique = true)
    private String slug;

    @ManyToMany(fetch = FetchType.EAGER)
    @JoinTable(name = "category_movie", joinColumns = @JoinColumn(name = "movie_id"), inverseJoinColumns = @JoinColumn(name = "category_id"))
    private List<Categories> categories;
    private String posters;
    private String thumbnail;
    private String video;

    @Column(columnDefinition = "TEXT")
    private String description;
    private String trailer;

}
