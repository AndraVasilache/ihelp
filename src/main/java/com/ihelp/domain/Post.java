package com.ihelp.domain;

import com.ihelp.domain.enumeration.Tag;
import com.ihelp.domain.enumeration.Type;
import java.io.Serializable;
import java.time.LocalDate;
import javax.persistence.*;

/**
 * A Post.
 */
@Entity
@Table(name = "post")
public class Post implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    @Column(name = "id")
    private Long id;

    @Column(name = "date")
    private LocalDate date;

    @Column(name = "content")
    private String content;

    @Column(name = "location")
    private String location;

    @Column(name = "verified")
    private Boolean verified;

    @Column(name = "completed")
    private Boolean completed;

    @Enumerated(EnumType.STRING)
    @Column(name = "tags")
    private Tag tags;

    @Enumerated(EnumType.STRING)
    @Column(name = "types")
    private Type types;

    @OneToOne
    @JoinColumn(unique = true)
    private User poster;

    // jhipster-needle-entity-add-field - JHipster will add fields here

    public Long getId() {
        return this.id;
    }

    public Post id(Long id) {
        this.setId(id);
        return this;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public LocalDate getDate() {
        return this.date;
    }

    public Post date(LocalDate date) {
        this.setDate(date);
        return this;
    }

    public void setDate(LocalDate date) {
        this.date = date;
    }

    public String getContent() {
        return this.content;
    }

    public Post content(String content) {
        this.setContent(content);
        return this;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public String getLocation() {
        return this.location;
    }

    public Post location(String location) {
        this.setLocation(location);
        return this;
    }

    public void setLocation(String location) {
        this.location = location;
    }

    public Boolean getVerified() {
        return this.verified;
    }

    public Post verified(Boolean verified) {
        this.setVerified(verified);
        return this;
    }

    public void setVerified(Boolean verified) {
        this.verified = verified;
    }

    public Boolean getCompleted() {
        return this.completed;
    }

    public Post completed(Boolean completed) {
        this.setCompleted(completed);
        return this;
    }

    public void setCompleted(Boolean completed) {
        this.completed = completed;
    }

    public Tag getTags() {
        return this.tags;
    }

    public Post tags(Tag tags) {
        this.setTags(tags);
        return this;
    }

    public void setTags(Tag tags) {
        this.tags = tags;
    }

    public Type getTypes() {
        return this.types;
    }

    public Post types(Type types) {
        this.setTypes(types);
        return this;
    }

    public void setTypes(Type types) {
        this.types = types;
    }

    public User getPoster() {
        return this.poster;
    }

    public void setPoster(User user) {
        this.poster = user;
    }

    public Post poster(User user) {
        this.setPoster(user);
        return this;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Post)) {
            return false;
        }
        return id != null && id.equals(((Post) o).id);
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Post{" +
            "id=" + getId() +
            ", date='" + getDate() + "'" +
            ", content='" + getContent() + "'" +
            ", location='" + getLocation() + "'" +
            ", verified='" + getVerified() + "'" +
            ", completed='" + getCompleted() + "'" +
            ", tags='" + getTags() + "'" +
            ", types='" + getTypes() + "'" +
            "}";
    }
}
